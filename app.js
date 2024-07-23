function getRandomValue(min,max){
    
    return Math.floor(Math.random()* (max-min) )+5;

}

const app =Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound: 0,
            winner:null,
            logMessage : [],

        }
    },

    computed:{
        monsterBarStyles(){
            return {
                width:this.monsterHealth + '%'
            }
        },
        playerBarStyles(){
            return {
                width:this.playerHealth + '%'
            }
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
            
        },
        mayUseHeal(){
            return this.currentRound % 3 !== 0
        }
    },
    watch:{
        
        playerHealth(value){
            if(value<=0 && this.monsterHealth <=0){
                this.winner = 'draw'

            }else if(value <= 0 ){
                this.winner = 'monster'
            }

        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth <=0){
                this.winner = 'draw'

            }else if(value <= 0 ){
                this.winner = 'player'

            }

        }
    },
    methods:{
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth= 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessage = []
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            if(this.monsterHealth - attackValue < 0){
                this.monsterHealth = 0
            }else{

                this.monsterHealth -= attackValue;
            }
            this.addLogMessage('player', 'attack' , attackValue)
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            if(this.playerHealth - attackValue < 0){
                this.playerHealth = 0
            }else{

                this.playerHealth -= attackValue;
            }
            this.addLogMessage('Monster', 'attack' , attackValue)

            
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack' , attackValue)
            
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;

            const healValue = getRandomValue(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{

                this.playerHealth+=healValue
            }
            this.addLogMessage('player', 'heal' , healValue)

            },
        surrender(){
            
            this.winner = 'monster'
        },
        addLogMessage(who,what,value){
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }

});

app.mount('#game');