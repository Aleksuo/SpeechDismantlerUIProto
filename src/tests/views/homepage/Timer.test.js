/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import Timer from "../../../views/HomePage/Timer"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})


describe("Timer component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<Timer elapsed={0}/>) 
        expect(wrapper).toMatchSnapshot()
    })
})