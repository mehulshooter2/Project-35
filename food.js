class Food{
    constructor(){
        this.foodStock = 20;
        this.lastFed;
        this.image = loadImage("images/Milk.png")
    }
    display(){
        var x = 80,y = 100;
        imageMode(CENTER)
        image(this.image,730,280,70,70);

        if(this.foodStock != 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%20==0){
                    x = 80;
                    y = 400+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }

    }
    getFoodStock(){
        return this.foodStock
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    updateFoodStock(foodStock){
        this.foodStock =foodStock;
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock -1;
        }
        return this.foodStock;
    }
    bedroom(){
        background(bedroomImg,550,500);
    }
    garden(){
        background(gardenImg,550,500);
    }
    washroom(){
        background(washroomImg,550,500);
    }
}
