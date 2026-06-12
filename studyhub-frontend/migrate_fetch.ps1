Get-ChildItem -Path "src/pages" -Recurse -Include "*.tsx" | ForEach-Object {
    $c = Get-Content $_.FullName -Raw -Encoding UTF8
    $n = $c -replace 'fetch\(`\$\{BASE_URL\}/', 'apiFetch(`/'
    if ($n -ne $c) {
        Set-Content $_.FullName $n -Encoding UTF8 -NoNewline
        Write-Host "Patched:" $_.Name
    }
}
