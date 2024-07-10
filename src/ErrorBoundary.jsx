import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component{
    state={hasError:false};
    static getDerivedStateFromError(){
        return {hasError:true}
    }
    componentDidCatch(error,info){

    }
    render(){
        if(this.state.hasError){
            return this.props.errorComponent;
        }
    }
}
export default ErrorBoundary;