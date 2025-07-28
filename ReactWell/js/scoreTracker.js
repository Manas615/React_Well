// Score tracking utility
const ScoreTracker = {
    // Save memory game score
    saveMemoryScore: function(moves) {
        console.log('ScoreTracker: Saving memory score:', moves);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            console.error('ScoreTracker: No user logged in!');
            return;
        }
        console.log('ScoreTracker: Current user:', currentUser);

        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        console.log('ScoreTracker: Current userStats:', userStats);
        
        const userGameStats = userStats[currentUser.name] || {};
        if (!userGameStats.memory) {
            userGameStats.memory = [];
        }

        userGameStats.memory.push({
            date: new Date().toISOString(),
            moves: moves
        });

        userStats[currentUser.name] = userGameStats;
        
        try {
            localStorage.setItem('userStats', JSON.stringify(userStats));
            console.log('ScoreTracker: Successfully saved memory score');
            console.log('ScoreTracker: Updated userStats:', JSON.parse(localStorage.getItem('userStats')));
        } catch (error) {
            console.error('ScoreTracker: Error saving to localStorage:', error);
        }
    },

    // Save whack-a-mole score
    saveWhackScore: function(score, reactionTime, accuracy) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        const userGameStats = userStats[currentUser.name] || {};
        
        if (!userGameStats.whack) {
            userGameStats.whack = [];
        }

        userGameStats.whack.push({
            date: new Date().toISOString(),
            score: score,
            reactionTime: reactionTime,
            accuracy: accuracy
        });

        userStats[currentUser.name] = userGameStats;
        localStorage.setItem('userStats', JSON.stringify(userStats));
    },

    // Save word puzzle score
    saveWordScore: function(score) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        const userGameStats = userStats[currentUser.name] || {};
        
        if (!userGameStats.word) {
            userGameStats.word = [];
        }

        userGameStats.word.push({
            date: new Date().toISOString(),
            score: score
        });

        userStats[currentUser.name] = userGameStats;
        localStorage.setItem('userStats', JSON.stringify(userStats));
    },

    // Check if user is logged in
    isLoggedIn: function() {
        const isLoggedIn = !!localStorage.getItem('currentUser');
        console.log('ScoreTracker: Checking login status:', isLoggedIn);
        return isLoggedIn;
    },

    // Redirect to login if not logged in
    requireLogin: function() {
        if (!this.isLoggedIn()) {
            console.log('ScoreTracker: User not logged in, redirecting to login page');
            window.location.href = '../login.html';
            return false;
        }
        return true;
    }
}; 