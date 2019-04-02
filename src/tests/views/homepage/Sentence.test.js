/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import Sentence from "../../../views/homepage/Sentence"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

const emptySentence = {
    startTime: 0,
    words: []
}
describe("Sentence component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<Sentence sentence={emptySentence}/>) 
        expect(wrapper).toMatchSnapshot()
    })
})