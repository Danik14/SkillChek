import TinderCard from 'react-tinder-card'
import {useState} from 'react'
import ChatContainer from '../components/ChatContainer'


const Dashboard = () => {

    const characters = [
        {
            name: 'Maxat Issaliyev',
            url: "https://i.imgur.com/pYGj3TB.jpg"
        },
        {
            name: 'Kamal Mamedov',
            url: 'https://i.imgur.com/OoW3AKj.jpg'
        },
        {
            name: 'Daniyar Chapagan',
            url: 'https://i.imgur.com/tfIe1FE.jpg'
        },
        {
            name: 'Alibek Keneskhanov',
            url: 'https://i.imgur.com/EKiWQTS.jpg'
        },
        {
            name: 'Olzhas Aimukhambetov',
            url: 'https://i.imgur.com/wbgC8hv.jpg'
        }
    ]
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    return (
        <div className="Dashboard">
            <ChatContainer/>
            <div className="swipe-container">
                <div className="card-container">

                    {characters.map((character) =>
                        <TinderCard className='swipe'
                                    key={character.name}
                                    onSwipe={(dir) => swiped(dir, character.name)}
                                    onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{backgroundImage: 'url(' + character.url + ')'}}
                                 className='card'
                            >
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>


                </div>
            </div>
        </div>
    )
}
export default Dashboard