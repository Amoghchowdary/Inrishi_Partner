$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Source = "C:\Users\MYPC\Desktop\InRishi\INRISHI_PARTNER_V66"
$Deploy = "C:\Users\MYPC\Desktop\InRishi\Partner_Delpoyment\Inrishi_Partner"
$Remote = "https://github.com/Amoghchowdary/Inrishi_Partner.git"
$ExpectedFrontend = "66.0.0"
$ExpectedBackend = "62.0.0"

function Assert-File([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Required file missing: $Path"
    }
}

Write-Host "=== INRISHI Partner V66 production handoff ==="
Assert-File "$Source\package.json"
Assert-File "$Source\backend-contract.json"
Assert-File "$Source\.github\workflows\deploy-pages.yml"
Assert-File "$Source\scripts\verify-backend-health.mjs"

$sourcePkg = Get-Content "$Source\package.json" -Raw | ConvertFrom-Json
$sourceContract = Get-Content "$Source\backend-contract.json" -Raw | ConvertFrom-Json
$sourceWorkflow = Get-Content "$Source\.github\workflows\deploy-pages.yml" -Raw

if ($sourcePkg.version -ne $ExpectedFrontend) { throw "Wrong Partner source: expected $ExpectedFrontend, found $($sourcePkg.version)." }
if ($sourceContract.version -ne $ExpectedBackend) { throw "Wrong Partner backend contract: expected $ExpectedBackend, found $($sourceContract.version)." }
if ($sourceWorkflow -notmatch 'Deploy INRISHI Partner V66 Production') { throw "Partner V66 workflow identity missing." }
if ($sourceWorkflow -notmatch 'Verify deployed Apps Script backend contract') { throw "Generic backend contract gate missing." }
if ($sourceWorkflow -match 'Verify deployed Apps Script V60 backend|Verify deployed Apps Script V61 backend') { throw "Obsolete hard-coded backend gate detected in Partner source." }

if (-not (Test-Path -LiteralPath "$Deploy\.git" -PathType Container)) {
    throw "Persistent Partner deployment clone is missing .git: $Deploy"
}

Set-Location $Deploy
git remote set-url origin $Remote
if ($LASTEXITCODE -ne 0) { throw "git remote set-url failed for Partner." }
git fetch origin
if ($LASTEXITCODE -ne 0) { throw "git fetch origin failed for Partner." }
git reset --hard origin/main
if ($LASTEXITCODE -ne 0) { throw "git reset --hard origin/main failed for Partner." }

robocopy $Source $Deploy /MIR /XD ".git" "node_modules" "dist" ".vite" /XF ".env" ".env.local" "*.log"
$robocopyCode = $LASTEXITCODE
if ($robocopyCode -ge 8) { throw "Robocopy failed for Partner with exit code $robocopyCode." }

$deployedPkg = Get-Content "$Deploy\package.json" -Raw | ConvertFrom-Json
$deployedContract = Get-Content "$Deploy\backend-contract.json" -Raw | ConvertFrom-Json
$deployedWorkflow = Get-Content "$Deploy\.github\workflows\deploy-pages.yml" -Raw
if ($deployedPkg.version -ne $ExpectedFrontend) { throw "Partner deployment clone is not V66 after Robocopy." }
if ($deployedContract.version -ne $ExpectedBackend) { throw "Partner deployment clone backend contract is not V62." }
if ($deployedWorkflow -notmatch 'Deploy INRISHI Partner V66 Production') { throw "Old Partner workflow remains after Robocopy." }

Write-Host "--- Partner diff before commit ---"
git status
git diff --stat
git diff -- .github/workflows/deploy-pages.yml backend-contract.json scripts/verify-backend-health.mjs package.json

git add -A
if ($LASTEXITCODE -ne 0) { throw "git add failed for Partner." }

$stagedPkg = (git show :package.json | Out-String) | ConvertFrom-Json
$stagedContract = (git show :backend-contract.json | Out-String) | ConvertFrom-Json
$stagedWorkflow = git show :.github/workflows/deploy-pages.yml | Out-String
if ($stagedPkg.version -ne $ExpectedFrontend) { throw "Staged Partner package is not V66." }
if ($stagedContract.version -ne $ExpectedBackend) { throw "Staged Partner contract is not V62." }
if ($stagedWorkflow -notmatch 'Deploy INRISHI Partner V66 Production') { throw "Staged Partner workflow is not V66." }
if ($stagedWorkflow -match 'Verify deployed Apps Script V60 backend|Verify deployed Apps Script V61 backend') { throw "Old Partner backend gate is still staged." }

git diff --cached --quiet
$stagedDiffCode = $LASTEXITCODE
if ($stagedDiffCode -eq 0) { throw "No Partner V66 changes are staged. Refusing to claim a production push." }
if ($stagedDiffCode -ne 1) { throw "Unable to inspect staged Partner changes." }

git commit -m "Deploy INRISHI Partner V66 production"
if ($LASTEXITCODE -ne 0) { throw "Partner commit failed." }
git push origin main
if ($LASTEXITCODE -ne 0) { throw "Partner push failed." }

git fetch origin
if ($LASTEXITCODE -ne 0) { throw "Partner post-push fetch failed." }
$localHead = (git rev-parse HEAD).Trim()
$remoteHead = (git rev-parse origin/main).Trim()
if ($localHead -ne $remoteHead) { throw "Partner push verification failed: local HEAD and origin/main differ." }

$remotePkg = (git show origin/main:package.json | Out-String) | ConvertFrom-Json
$remoteContract = (git show origin/main:backend-contract.json | Out-String) | ConvertFrom-Json
$remoteWorkflow = git show origin/main:.github/workflows/deploy-pages.yml | Out-String
if ($remotePkg.version -ne $ExpectedFrontend) { throw "origin/main Partner package is not V66." }
if ($remoteContract.version -ne $ExpectedBackend) { throw "origin/main Partner contract is not V62." }
if ($remoteWorkflow -notmatch 'Deploy INRISHI Partner V66 Production') { throw "origin/main Partner workflow is not V66." }
if ($remoteWorkflow -match 'Verify deployed Apps Script V60 backend|Verify deployed Apps Script V61 backend') { throw "origin/main still contains an obsolete Partner backend gate." }

Write-Host "SUCCESS: Partner origin/main is V66 and targets Apps Script contract V62. GitHub Actions now owns acceptance/build/deployment."
