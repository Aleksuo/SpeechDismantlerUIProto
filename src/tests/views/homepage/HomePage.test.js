/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount} from "enzyme"
import HomePage from "../../../views/HomePage/HomePage"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

const defaultState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	interim: "",
	left: false,
}

describe("HomePage component", () =>{
    test("renders", () =>{
        const wrapper = shallow(<HomePage state={defaultState}/>)
        expect(wrapper).toMatchSnapshot()
    })
})