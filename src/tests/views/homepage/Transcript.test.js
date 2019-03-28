/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import Transcript from "../../../views/HomePage/Transcript"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

describe("Transcript component", () =>{
    test("renders", () =>{ 
        // for some reason using mount causes a memory leak here and refs are not supported in shallow
        const wrapper = render(<Transcript transcript={[]}/>) 
        expect(wrapper).toMatchSnapshot()
    })
})