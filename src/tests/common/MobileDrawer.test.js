/* eslint-disable */
import React from "react"
import Enzyme, {shallow, mount,render} from "enzyme"
import MobileDrawer from "../../common/MobileDrawer"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})


describe("MobileDrawer component", () =>{
    test("renders", () =>{ 
        const wrapper = shallow(<MobileDrawer/>) 
        expect(wrapper).toMatchSnapshot()
    })
})