import React from "react"
import Enzyme, {shallow, mount} from "enzyme"
import HomePage from "../views/HomePage"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

const mockState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	interim: "",
	left: false,
}

describe("HomePage component", () =>{
    test("renders", () =>{
        const wrapper = shallow(<HomePage state={mockState}/>)
        expect(wrapper.exists()).toBe(true)
    })
})