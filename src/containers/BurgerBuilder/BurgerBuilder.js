import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    meat: 1.5,
    cheese: 0.75,
    bacon: 2,
    salad: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients)=> {
        const sum = Object.keys(ingredients).
            reduce((sum, value) => {
                return sum + ingredients[value];
            },0);
        this.setState({purchasable: sum > 0}); 
    }

    addIngredientHandler = (type) =>{
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]++;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const updatedIngredients = {...this.state.ingredients};
        if(updatedIngredients[type] > 0){
            updatedIngredients[type]--;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // TODO: Send order to the server
        alert('Purchase completed successfully');
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchasedContinue = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice}/>
                </Modal>
                <Burger 
                    ingredients={this.state.ingredients} 
                />
                <BuildControls
                    price = {this.state.totalPrice}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;