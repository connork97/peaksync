import ListGroup from 'react-bootstrap/ListGroup'

const ClassData = ({ allClasses, setAllClasses }) => {
    
    const renderAllClasses = allClasses.map((clas) => {
        return (
            <ListGroup.Item>
                {clas.id} - {clas.name} - ${clas.price} - {clas.category} - {clas.capacity} - {clas.hours} - {clas.minutes} - {clas.description}
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup id="adminClassesListGroup">
            {renderAllClasses}
        </ListGroup>
    )
}

export default ClassData