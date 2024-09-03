import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    meat: 1.5,
    cheese: 0.75,
    bacon: 2,
    salad: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
        }
    )}

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
        this.setState({loading: true});
        axios.post('/orders.json', {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Noman Nawaz',
                address: {
                    street: '555 Main St',
                    zipCode: '52000',
                    country: 'Pakistan'
                },
                email: 'noman@example.com'
            },
            deliveryMethod: 'fastest'
        })
            .then(resp => this.setState({
                ingredients: {
                    meat: 0,
                    cheese: 0,
                    bacon: 0,
                    salad: 0
                },
                totalPrice: 0,
                purchasable: false,
                purchasing: false,
                loading: false,
            }))
            .catch(error => this.setState({loading: false}));

        
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary =null;
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
                <>
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
            )
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice}/>
            )
        }
        if(this.state.loading)
            orderSummary = <Spinner/>
        return (
            <>
                {burger}
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
            </>
        );
    }
}

export default BurgerBuilder;