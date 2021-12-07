const embedIframe = (
<div 
    style={{height: "533.33px", width: "300.00px", position: "relative"}} className="centered">
        <iframe allow="autoplay; gyroscope;" allowfullscreen height="100%" referrerpolicy="strict-origin" src="https://www.kapwing.com/e/6080d28e785c43009a5936d6" 
        style={{maxHeight: "100%",border: "0", height: "100%", left: "0", overflow: "hidden", position: "absolute", top: "0", width: "100%"}} title="Embedded content made on Kapwing" width="100%">
     </iframe></div>)

function TardigradeSongPage() {
    return (
      <>
      <h2> What Organism Would You Be? </h2>
  
      {embedIframe}
      <br/>

      A short song in response to the classic icebreaker question, "What kind of animal (or plant, or fungus, ect.) would you be"?
      
      </>
    );
  }
  
  export default TardigradeSongPage;