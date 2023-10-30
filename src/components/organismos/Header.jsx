import PropTypes from "prop-types"
import { ContentHeader } from "../atomos/ContentHeader"
import { DataUser } from "./DataUser"

export const Header = ({ stateConfig }) => {
    return (
        <ContentHeader>
            <DataUser stateConfig={stateConfig} />
        </ContentHeader>
    )
}

Header.propTypes = {
    stateConfig: PropTypes.any
}
