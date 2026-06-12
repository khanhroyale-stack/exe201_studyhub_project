# Remove unused BASE_URL constant from all TSX files
Get-ChildItem -Path "src/pages" -Recurse -Include "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    # Remove the BASE_URL const line
    $new = $content -replace "const BASE_URL = import\.meta\.env\.VITE_API_BASE_URL \|\| 'http://localhost:8080/api/v1';\r?\n", ""
    if ($new -ne $content) {
        Set-Content $_.FullName $new -Encoding UTF8 -NoNewline
        Write-Host "Removed BASE_URL from:" $_.Name
    }
}
