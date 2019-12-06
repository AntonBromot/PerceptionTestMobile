import React from "react"
import { TouchableOpacity } from "react-native"

import { IconEdit } from "./styles"

const IconEditComponent = ({ color, onPress }) => (
        <TouchableOpacity { ...{ onPress } }>
            <IconEdit { ...{ name: "edit", color } } />
        </TouchableOpacity>
)


export default IconEditComponent
