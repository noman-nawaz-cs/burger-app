import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import axios from '../../../axios-orders';

const withErrorHandler = (WrappedComponent,axios) => {
    return (class extends React.Component {
        state = {
            error: null
        };

        componentDidMount() {
            this.reqInterceptor = axios .interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                return Promise.reject(error);
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} error = {this.props.error} />
                </>
            );
        }
    }

)}

export default withErrorHandler;