# Replace relative paths in JavaScript files
Get-ChildItem -Path "./*.js" -File | ForEach-Object {
    # Read file content
    $content = Get-Content $_.FullName -Raw

    # Perform the replacements
    $content = $content -replace  '/megaten-fusion-tool/assets/images/', 'assets/images/'
    $content = $content -replace  '/megaten-fusion-tool/assets/images/', 'assets/js/'

    # Write the modified content back to the file
    $content | Set-Content $_.FullName -NoNewline
}