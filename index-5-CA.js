class Product {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    describe() {
        return `${this.name} is a ${this.type}.`;
    }
}

class Store {
    constructor(name) {
        this.name = name;
        this.products = [];
    }

    addProduct(product) {
        if (product instanceof Product) {
            this.products.push(product);
        } else {
            throw new Error(`You have to add an instance of Product: ${product} is not a product`);
        }
    }

    describe() {
        return `We need ${this.products.length} from ${this.name}.`;
    }
}

class Menu {
    constructor() {
        this.stores = [];
        this.selectedStore = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case "1":
                    this.createStore();
                    break;
                case "2":
                    this.displayStores();
                    break;
                case "3":
                    this.deleteStore();
                    break;
                case "4":
                    this.viewShoppingList();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("Thanks for shopping with us. See you next time!");
    }

    showMainMenuOptions() {
        return prompt(`
        Done Shopping? Enter 0
        To create a new store, Enter 1
        To view stores, Enter 2
        To delete a store, Enter 3
        To view shopping list, Enter 4
        `);
    }

    showStoreMenuOptions(storeInfo) {
        return prompt(`
        To go back, Enter 0
        To create a product, Enter 1
        To delete a product, Enter 2
        -------------------------
        ${storeInfo}
        `);
    }

    displayStores() {
        let storeString = "";
        for (let i = 0; i < this.stores.length; i++) {
            storeString += i + ") " + this.stores[i].name + "\n";
        }
    
        let index = prompt(storeString + "\n" + "Enter the index of the store you want to view:");
        if (index > -1 && index < this.stores.length) {
            this.selectedStore = this.stores[index];
            let description =
             "Store Name: " + this.selectedStore.name + "\n";

            for (let i = 0; i < this.selectedStore.products.length; i++) {
                description += i + ") " + this.selectedStore.products[i].name
                 + " - " + this.selectedStore.products[i].type + "\n";
            } 
        
        let selection = this.showStoreMenuOptions(description);
        switch (selection) {
            case "1":
                this.createProduct();
                break;
            case "2":
                this.deleteProduct();
        }
    } 
    
}   

    createStore() {
        let name = prompt(`Enter what you wish to name a new store`);
        this.stores.push(new Store(name));
    }

    viewShoppingList() {
        
        let shoppingListString = "";

        for (let i = 0; i < this.stores.length; i++) {
            shoppingListString += i + ") " + this.stores[i].name + "\n"
            for (let j = 0; j < this.stores[i].products.length; j++) {
             let currentStore = this.stores[i];
                let product = currentStore.products[j];
           //shoppingListString += j + ") " + currentStore.name + "\n"
               // + product.name + " - " + product.type + "\n"
               shoppingListString += product.name + " - " + 
               product.type + "\n"    
            }
        }
        alert(`This is what we have on our shopping list:` + `\n` + shoppingListString);
        
    }
       


    deleteStore() {
        let index = prompt("Enter the index of the store you wish to delete:");
        if (index > -1 && index < this.stores.length) {
            this.stores.splice(index, 1);
        }
    }

    createProduct() {
        let item = prompt("Enter name of new item:");
        let type = prompt("Enter type of new item:");
        this.selectedStore.products.push(new Product(item, type));
    }

    deleteProduct() {
        let index = prompt("Enter the index of the product you're deleting:");
        if (index > -1 && index < this.selectedStore.products.length) {
            this.selectedStore.products.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();