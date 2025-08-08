# Replace relative paths in JavaScript files
Get-ChildItem -Path "./*.js" -File | ForEach-Object {
    # Read file content
    $content = Get-Content $_.FullName -Raw

    # Perform the replacements
    $content = $content -replace 'assets\/images\/', '/megaten-fusion-tool/assets/images/'
    $content = $content -replace 'assets\/js\/', '/megaten-fusion-tool/assets/js/'

    # Write the modified content back to the file
    $content | Set-Content $_.FullName -NoNewline
}