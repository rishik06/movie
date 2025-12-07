#!/bin/bash
# Helper script to kill processes on ports 3000 and 8081

echo "Killing processes on ports 3000 and 8081..."

# Kill port 3000 (backend)
if lsof -ti:3000 > /dev/null 2>&1; then
    lsof -ti:3000 | xargs kill -9
    echo "✓ Killed process on port 3000"
else
    echo "✓ Port 3000 is free"
fi

# Kill port 8081 (Expo)
if lsof -ti:8081 > /dev/null 2>&1; then
    lsof -ti:8081 | xargs kill -9
    echo "✓ Killed process on port 8081"
else
    echo "✓ Port 8081 is free"
fi

echo "Done!"

