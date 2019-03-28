/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import Interim from "../../../views/HomePage/Interim"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

describe("Interim component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<Interim interim={""}/>) 
        expect(wrapper).toMatchSnapshot()
    })
})