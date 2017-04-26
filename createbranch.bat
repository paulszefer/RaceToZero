@echo offecho.
echo.
echo WARNING!
echo.
echo This will overwrite any changes that you have made.
echo.
echo Press CTRL+C to cancel.
echo.
pause
SET branch=%~1
if NOT DEFINED branch (SET branch=development)
echo.
echo Deleting old '%branch%' branch.
echo.
git branch -D %branch%
echo.
echo Deleting remote copy of '%branch%'.
echo.
git push origin -d %branch%
echo.
echo Creating '%branch%' branch.
echo.
git branch %branch%
echo.
echo Creating remote copy of '%branch%'.
echo.
git push --set-upstream origin %branch%
echo.
pause