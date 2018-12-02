
import React, { Component } from 'react';
import firebase from '../Config/firebase';
import Form from '../Components/Form';
import Button from '@material-ui/core/Button';

class Login extends Component {
constructor(){
    super();
    this.state={
     user:false,
     sigin:false,
     signup:false,
     emailsignin:"",
     emailsignup:"",
     passwordsignin:"",
     passwordsignup:"",
     hospitalname:"",
     erromessage:false,
     errormessagesignup:"",
     phoneno:"",
     branch:false,
     branchname:''
    }
}

login=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.emailsignin,this.state.passwordsignin).then((user)=>{
        if(user){
        this.setState({user:true});
      
    }
    else{
        this.setState({user:false});
    }
    }).catch((error)=>{
      this.setState({erromessage:true})
    })
}

signup=()=>{
firebase.auth().createUserWithEmailAndPassword(this.state.emailsignup,this.state.passwordsignup).then((user)=>{
    this.setState({signin:true,signup:false});

    firebase.database().ref('/Hospitals').child(`${firebase.auth().currentUser.uid}`).set({
Email:this.state.emailsignup,
HospitalName:this.state.hospitalname,
Branch:this.state.branchname,
Phoneno:this.state.phoneno


    })
}).catch((error)=>{
    console.log(error)
    this.setState({errormessagesignup:error.message});
})
}

componentDidMount=()=>{
    this.authListener()
}

authListener=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.setState({user:true})
        }
        else{
            this.setState({user:false})
        }
    })
}

signout=()=>{
    firebase.auth().signOut();
    this.setState({user:false})
}

seterrorsignin=()=>{
   
        setTimeout(() => {
           this.setState({erromessage:false}) 
        }, 3000);
    }

    seterrorsignup=()=>{
        setTimeout(()=> {
            this.setState({errormessagesignup:""})
        },3000)
    }




render(){
    return(
        <div>

            {this.state.user==true && <div>
                <Button onClick={()=>{this.signout()}} variant="contained" color="primary">Logout</Button>
                <Form/>
            </div>}
{this.state.user==false && <div>
            {this.state.user==false && <div><button onClick={()=>{this.setState({signin:true});this.setState({signup:false})}}>Login</button>
            <button onClick={()=>{this.setState({signup:true});this.setState({signin:false})}}>Signup</button></div>}
    {this.state.signin==true && <div>
        <center>
        <h3>Please Sign In</h3>
<input onChange={(e)=>this.setState({emailsignin:e.target.value})} placeholder="Email.."/><br/><br/>
<input onChange={(e)=>this.setState({passwordsignin:e.target.value})} placeholder="Password.." /><br/><br/>
{this.state.emailsignin.length!==0 && this.state.passwordsignin.length!==0 && <button onClick={()=>{this.login();this.seterrorsignin()}}>Login</button>}
{this.state.erromessage && <p style={{color:'red'}}>You Have Entered Wrong Email Or Password</p>}
</center>

        </div>}

          {this.state.signup==true && <div>
              <center>
        <h3>Create An Account</h3>
<input onChange={(e)=>this.setState({hospitalname:e.target.value})} placeholder="Hospital Name.."/><br/><br/>
<input value="Yes" type="checkbox" onChange={()=>this.setState({branch:!this.state.branch})}/>Any Branch?<br/>
{this.state.branch && <div> <input onChange={(e)=>this.setState({branchname:e.target.value})} placeholder="Branch Name.."/><br/><br/> </div>}
<input onChange={(e)=>this.setState({phoneno:e.target.value})} placeholder="Phone No.."/><br/><br/>
<input onChange={(e)=>this.setState({emailsignup:e.target.value})} placeholder="Email.." type="email"/><br/><br/>
<input onChange={(e)=>this.setState({passwordsignup:e.target.value})} placeholder="Password.." type="password"/><br/><br/>
{this.state.hospitalname.length !==0 && this.state.emailsignup.length !== 0 && this.state.passwordsignup.length !== 0 && <button onClick={()=>{this.signup();this.seterrorsignup()}}>Signup</button>}
{(this.state.errormessagesignup=="The email address is badly formatted.")?(<p style={{color:'red'}}>Please Enter Correct Email</p>):(<p></p>)}
{(this.state.errormessagesignup=="Password should be at least 6 characters")?(<p style={{color:'red'}}>Password Should Be Atleast 6 Character</p>):(<p></p>)}
</center>
        </div>}
        </div>}
        </div>
    )
}

}

export default Login;