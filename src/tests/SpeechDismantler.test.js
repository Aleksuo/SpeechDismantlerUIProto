/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import SpeechDismantler from "../SpeechDismantler"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})


describe("SpeechDismantler component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<SpeechDismantler server_address={"..."}/>) 
        expect(wrapper).toMatchSnapshot()
    })
})