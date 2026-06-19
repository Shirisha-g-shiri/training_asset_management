import { useState } from "react"

function ArithmeticComponent(){
    let n1 = 4
    let n2 = 5
    let [result, setResult] = useState(); // result = undefined -- useState react Hook 

    const operation = (op)=>{
        switch(op){
            case 'SUM' :
                // alert(op)
                setResult(n1+n2)
                //console.log(result)
                break  
            case 'SUB':
                // alert(op)
                setResult(n1-n2)
                //console.log(result)
                break
            case 'MUL':
                // alert(op)
                setResult(n1*n2)
                //console.log(result)
                break
            case 'DIV':
                // alert(op)
                setResult(n1/n2)
                //console.log(result)
                break
            default:
                break
        }
    }
    return(
        <div>
            <h1>Arithmetic Component</h1>
            <p>Sum is: {n1+n2}</p>
            <p>Sub is: {n1-n2}</p>
            <p>Mul is: {n1*n2}</p>
            <p>Div is: {n1/n2}</p>
            
            <hr />
            <div>
                <p>Result of (n1=4 & n2=5) is: {result}</p> 
                <p><button onClick={()=>operation('SUM')}>SUM</button></p>
                <p><button onClick={()=>operation('SUB')}>SUB</button></p>
                <p><button onClick={()=>operation('MUL')}>MUL</button></p>
                <p><button onClick={()=>operation('DIV')}>DIV</button></p>
            </div>

        </div>
    )
}

export default ArithmeticComponent

/*
funnction myFn(){ -- name of this fn is myFn 
}

()=>{} -- no name Fn Anonymous

*/