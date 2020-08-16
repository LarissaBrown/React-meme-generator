import React from "react"


class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {

            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
            this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount (){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
           const {memes} = response.data
           console.log(memes[0])
            this.setState( {
                allMemeImages: memes
            })
            
        })
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value,
            
            
        })
        
    }

    handleSubmit(event) {
        event.preventDefault()
           const i = Math.floor(Math.random()* this.state.allMemeImages.length);
           const randMemeImage = this.state.allMemeImages[i].url
        
           this.setState( {
           randomImage: randMemeImage,
           topText: "",
           bottomText: ''

           
            
        })
    }
    

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} classname="meme-form">
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    
                    <h2 className="top">{this.state.topText}</h2>
                    <img src={this.state.randomImage} alt=""/>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator