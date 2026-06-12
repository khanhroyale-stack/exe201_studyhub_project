# Add apiFetch import to all files that use apiFetch but don't import it yet
$files = Get-ChildItem -Path "src/pages" -Recurse -Include "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has apiFetch import
    if ($content -match "import \{ apiFetch \}") { continue }
    
    # Skip if doesn't use apiFetch
    if (-not ($content -match "apiFetch\(")) { continue }
    
    # Find the last import line and add apiFetch import after it
    $lines = Get-Content $file.FullName -Encoding UTF8
    $lastImportIndex = -1
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "^import ") {
            $lastImportIndex = $i
        }
    }
    
    if ($lastImportIndex -ge 0) {
        $newLines = $lines[0..$lastImportIndex] + "import { apiFetch } from '../../utils/api';" + $lines[($lastImportIndex+1)..($lines.Length-1)]
        Set-Content $file.FullName $newLines -Encoding UTF8
        Write-Host "Added import to:" $file.Name
    }
}
