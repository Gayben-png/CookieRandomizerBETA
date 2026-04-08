Game.registerMod("Randomizer_Preview", {
    init: function() {
        Game.Notify("Cookie Randomizer [PREVIEW]", "Mod successfully loaded!", [16, 5]);
        
        setTimeout(function() {
            Game.Notify("IMPORTANT NOTE", "Optimized for 'Better Auto Clicker'. Manual support soon!", [1, 2]);
        }, 3000);

        var oldClick = Game.ClickCookie;
        Game.ClickCookie = function() {
            oldClick();
            if (Math.random() < 0.50) {
                Game.mods["Randomizer_Preview"].triggerRandomEvent();
            }
        };
    },

    triggerRandomEvent: function() {
        let roll = Math.floor(Math.random() * 6);
        
        if (roll == 0) {
            Game.Earn(10000);
            Game.Notify("JACKPOT!", "10,000 cookies added!", [10, 14]);
        } 
        else if (roll == 1) {
            new Game.shimmer("gold", {noStatus: true}).spawn();
            Game.Notify("GOLDEN!", "A lucky shimmer appears!", [10, 14]);
        } 
        else if (roll == 2) {
            Game.lumps += 1;
            Game.Notify("SWEET!", "You found 1 Sugar Lump!", [29, 16]);
        } 
        else if (roll == 3) {
            let amountToRemove = Math.min(Game.Objects['Grandma'].amount, 25);
            Game.Objects['Grandma'].sacrifice(amountToRemove); 
            Game.Notify("Grandma Strike!", "25 Grandmas left the bakery!", [1, 1]);
        } 
        else if (roll == 4) {
            // --- WRINKLER & DOOMSDAY TIMER ---
            Game.SpawnWrinkler();
            Game.Notify("Wrinkler Has Spawned!", "You Have Only 5 Minutes", [19, 8]);
            
            // 5 dakika (300,000 milisaniye) sonra Grandmapocalypse başlar
            setTimeout(function() {
                if (Game.elderWrath < 1) {
                    Game.elderWrath = 1; // Kıyameti 1. seviyeden başlatır
                    Game.recalculateGains = 1;
                    Game.Notify("APOCALYPSE!", "The Grandmas are restless...", [15, 5]);
                }
            }, 300000);
        }
        else {
            Game.SparkleAt(Game.mouseX, Game.mouseY);
            Game.tickerL.say("The chaos continues...");
        }
    }
});