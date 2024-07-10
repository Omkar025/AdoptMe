import { Component } from "react";//class component must extend react component
class Carousel extends Component{
    state={//buitl in class components
        active:0
    }
    static defaultProps={
        images:["http://pets-images.dev-apis.com/pets/none.jpg"]
    };
    handleIndexCycle=()=>{//why arrow fn?->since a new func will create a new scope
        //with no context and that will lead to accessability issues(the fn cant access this(present obj))
        //whereas arrow fn will capture the scope of wherever its written
        //so it will it at capture caorusel here
        this.setState({
            active:+e.target.dataset.index//'+' is to convert string to a number 
        })

    }
   // componentDidUpdate(){
//built in lifecycle func
    //}
    render(){//func body of component
        //class components and hooks do not mix
        //every class component has a render function
        const {active}=this.state//instead of usestate,this is mutable state and class component
        const {images}=this.props

        return(//it has to return something
            <div className="carousel">
                <img src={images[active]} alt ="animal hero"/>
                <div className="carousel-smaller">
                    {images.map((photo,index)=>(//type of index-string since evrything that comes out from dom is string
                        <img
                            onClick={this.handleIndexClick}
                            data-index={index}
                            key={photo}
                            src={photo}
                            className={index===active ? "active":""}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }
}
/*
function CasourelParent({animal}){
const [breedList]=useBreedList(animal)
return <Caerousel breedList={breedList}/> 
if we want to use hooks in a class conponent then we can use it by making it inside a parent component
}
*/
export default Carousel;