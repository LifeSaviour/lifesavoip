import React, { Component } from 'react';
import firebase from '../Config/firebase'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            Beds: '',
            Doctors: '',
            VIPSuite: '',
            SingleDeluxeRoom: '',
            TwoBeddedRoom: '',
            FourBeddedRoom: '',
            IntensiveCareUnit: '',
            LabourandDeliverySuite: '',
            Nursery: '',
            IsolationRoom: '',
        }




    }
    Beds = (e) => {
        this.setState({ Beds: e.target.value })

    }

    Doctors = (e) => {

        this.setState({ Doctors: e.target.value })

    }

    VIPSuite = (e) => {

        this.setState({ VIPSuite: e.target.value })

    }

    SingleDeluxeRoom = (e) => {

        this.setState({ SingleDeluxeRoom: e.target.value })

    }

    TwoBeddedRoom = (e) => {

        this.setState({ TwoBeddedRoom: e.target.value })

    }

    FourBeddedRoom = (e) => {

        this.setState({ FourBeddedRoom: e.target.value })

    }

    IntensiveCareUnit = (e) => {

        this.setState({ IntensiveCareUnit: e.target.value })

    }

    LabourandDeliverySuite = (e) => {

        this.setState({ LabourandDeliverySuite: e.target.value })

    }

    Nursery = (e) => {

        this.setState({ Nursery: e.target.value })

    }

    IsolationRoom = (e) => {

        this.setState({ IsolationRoom: e.target.value })

    }


    updateBeds=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            BedsAvailible:this.state.Beds    
        })
    }

    updateDoctors=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            Doctors:this.state.Doctors    
        })
    }

    updateVIPSuite=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            VIPSuite:this.state.VIPSuite    
        })
    }

    updateSingleDeluxeRoome=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            SingleDeluxeRoom:this.state.SingleDeluxeRoom    
        })
    }
    
    updateTwoBeddedRoom=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            TwoBeddedRoom:this.state.TwoBeddedRoom    
        })
    }
    
    updateIntensiveCareUnit=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            IntensiveCareUnit:this.state.IntensiveCareUnit    
        })
    }

    updateFourBeddedRoom=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            FourBeddedRoom:this.state.FourBeddedRoom    
        })
    }

    updateIsolationRoom=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            IsolationRoom:this.state.IsolationRoom    
        })
    }

    updateLabourandDeliverySuite=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            LabourandDeliverySuite:this.state.LabourandDeliverySuite    
        })
    }

    updateNursery=()=>{
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).update({
            Nursery:this.state.Nursery    
        })
    }

    onSubmit = () => {
        const {
            Beds,
            Doctors,
            VIPSuite,
            SingleDeluxeRoom,
            TwoBeddedRoom,
            FourBeddedRoom,
            IntensiveCareUnit,
            LabourandDeliverySuite,
            Nursery,
            IsolationRoom } = this.state;
        firebase.database().ref('/Hospital Data').child(`${firebase.auth().currentUser.uid}`).set({

            BedsAvailible: Beds,
            Doctors: Doctors,
            VIPSuite: VIPSuite,
            SingleDeluxeRoom: SingleDeluxeRoom,
            TwoBeddedRoom: TwoBeddedRoom,
            FourBeddedRoom: FourBeddedRoom,
            IntensiveCareUnit: IntensiveCareUnit,
            LabourandDeliverySuite: LabourandDeliverySuite,
            Nursery: Nursery,
            IsolationRoom: IsolationRoom


        })
    }

    render() {
        const {
            Beds,
            Doctors,
            VIPSuite,
            SingleDeluxeRoom,
            TwoBeddedRoom,
            FourBeddedRoom,
            IntensiveCareUnit,
            LabourandDeliverySuite,
            Nursery,
            IsolationRoom } = this.state;
        return (
            <div>

                <div style={{ float: "left"}}>
                    <label for="Availibility of beds in vault">Availibility of beds in vault : </label>
                    <input type="number" name="Beds" id="beds" value={Beds} onChange={this.Beds} />
                    <button onClick={this.updateBeds}>Update</button>
                    <br/>
                </div>
                <br/>
                <div style={{ float: "right" }}>
                    <label for="Availibility of Doctors in Hospital">Availibility of Doctors in Hospital : </label>
                    <input type="number" name="Doctors" id="doctors" value={Doctors} onChange={this.Doctors} />
                    <button onClick={this.updateDoctors}>Update</button>
                    <br />
                 
                </div>
                <br/>
                <div style={{ float: "left" }}>
                    <label for=" VIP Suite"> VIP Suite : <span></span></label>
                    <input type="number" name="VIP Suite" id="vipsuite" value={VIPSuite} onChange={this.VIPSuite} />
                    <button  onClick={this.updateVIPSuite}>Update</button>
                </div>
                <br/>
                <div style={{ float: "right"}}>

                    <label for=" Single Deluxe Room	"> Single Deluxe Room : <span></span></label>
                    <input type="number" name="Single Deluxe Room" id="singleroom" value={SingleDeluxeRoom} onChange={this.SingleDeluxeRoom} />
                    <button onClick={this.updateSingleDeluxeRoome}>Update</button>
                </div>
                <br/>
                <div style={{ float: "left" }}>

                    <label for="  Two-Bedded Room">  Two-Bedded Room : <span></span></label>
                    <input type="number" name="" id="twobeddedroom" value={TwoBeddedRoom} onChange={this.TwoBeddedRoom} />
                    <button onClick={this.updateTwoBeddedRoom}>Update</button>
                </div>
                <br/>
                <div style={{ float: "right" }}>

                    <label for="  Four-Bedded Room">  Four-Bedded Room	: <span></span></label>
                    <input type="number" name="Four-Bedded Room" id="fourbeddedorom" value={FourBeddedRoom} onChange={this.FourBeddedRoom} />
                    <button onClick={this.updateFourBeddedRoom}>Update</button>
                </div>
                <br/>
                <div style={{ float: "left" }}>

                    <label for="  Intensive Care Unit (ICU)">  Intensive Care Unit (ICU) : <span></span></label>
                    <input type="number" name="Intensive Care Unit (ICU)" id="icu" value={IntensiveCareUnit} onChange={this.IntensiveCareUnit} />
                    <button onClick={this.updateIntensiveCareUnit}>Update</button>
                </div>
                <br/>
                <div style={{ float: "right"}}>


                    <label for="  Isolation Room">  Isolation Room	:<span></span>	</label>
                    <input type="number" name="Isolation Room" id="isolationroom" value={IsolationRoom} onChange={this.IsolationRoom} />
                    <button onClick={this.updateIsolationRoom}>Update</button>
                </div>
                <br/>
                <div style={{ float: "left"}}>

                    <label for="  Labour and Delivery Suite">  Labour and Delivery Suite :<span></span>	</label>
                    <input type="number" name="Labour and Delivery Suite" id="labouranddeliverysuite" value={LabourandDeliverySuite} onChange={this.LabourandDeliverySuite} />
                    <button onClick={this.updateLabourandDeliverySuite}>Update</button>
                    
                     </div>
                     <br/>                   
                     
                     <div style={{ float: "right" }}>

                        <label for=" Nurser"> Nursery : <span></span></label>
                        <input type="number" name="Nursery" id="nursery" value={Nursery} onChange={this.Nursery} />
                        <button onClick={this.updateNursery}>Update</button>
                        <br />
                        <br />
                        </div>
                        <br/>
                        {Beds.length !== 0 &&
                            Doctors.length !== 0 &&
                            VIPSuite.length !== 0 &&
                            SingleDeluxeRoom.length !== 0 &&
                            TwoBeddedRoom.length !== 0 &&
                            FourBeddedRoom.length !== 0 &&
                            IntensiveCareUnit.length !== 0 &&
                            LabourandDeliverySuite.length !== 0 &&
                            Nursery.length !== 0 &&
                            IsolationRoom !== 0 &&
                            <button onClick={this.onSubmit} > Submit </button>}

                    </div>
                    );
                }
            }
            
            export default Login;
