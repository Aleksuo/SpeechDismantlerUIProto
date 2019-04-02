/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import MiniDrawer from "../../common/MiniDrawer"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})


describe("MiniDrawer component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<MiniDrawer/>) 
        expect(wrapper).toMatchSnapshot()
    })
})