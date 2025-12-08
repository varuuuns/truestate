$intervalSeconds = 1800 # 30 minutes

Write-Host "Starting auto-push agent. Press Ctrl+C to stop."
while ($true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] Checking for changes..."
    
    if (git status --porcelain) {
        Write-Host "Changes detected. Committing and pushing..."
        git add .
        git commit -m "Auto-save: $timestamp"
        git push origin master
        Write-Host "Pushed successfully."
    } else {
        Write-Host "No changes to push."
    }
    
    Start-Sleep -Seconds $intervalSeconds
}
