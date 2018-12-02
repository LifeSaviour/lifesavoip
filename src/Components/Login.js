
import React, { Component } from 'react';
import firebase from '../Config/firebase';
import Form from '../Components/Form';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      }
  }

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
     branchname:'',
     left:false
    }
}

toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

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
                <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
                <div className={styles.root}>
                <AppBar position="static">
                <Toolbar>
                <IconButton className={styles.menuButton} color="inherit" aria-label="Menu" > >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" className={styles.grow}>
                Life Saviour
                </Typography>
                <Button onClick={()=>{this.signout()}} style={{float:"left"}} variant="contained" color="primary">Logout</Button>
                </Toolbar>
                </AppBar>
                </div>
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