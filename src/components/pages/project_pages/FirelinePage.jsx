import firelineImg from "../../../images/fireline.png"

function FirelinePage() {
  return (
    <>
    <h2> Fireline </h2>

    <img className="centered" src={firelineImg.src} alt="< A screenshot of the game Fireline in action >"/> 

    <p> Created with a team over the course of one semester as part of class ATL 497 (Rising Waters: A Climate Change Game), Fireline is 
        a turn-based strategy game written in Unity. In a near-future dominated by wildfires, you step into the shoes of the 
        director of Cal Fire, managing resources and commanding fire crews as you fight to 
        quell the flames. </p>

    <p> <a href="https://github.com/cordyceptive/fireline" target="blank" 
        title="Outgoing link to the repository containing Fireline" > Check out the repository here. </a>
    </p>
    </>
  );
}

export default FirelinePage;
