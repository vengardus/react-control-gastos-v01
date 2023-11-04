import PropTypes from "prop-types"
import { ContentHeader } from "../atomos/ContentHeader"
import { DataUser } from "./DataUser"

export const Header = ({ stateConfig }) => {
    return (
        <ContentHeader>
            <div onClick={(e) => e.stopPropagation()}>
                <DataUser stateConfig={stateConfig} />
            </div>
        </ContentHeader>
    )
}

Header.propTypes = {
    stateConfig: PropTypes.any
}
