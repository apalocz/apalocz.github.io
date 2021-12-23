import jar from "../images/patchwork_poems/jar.jpg";
import place from "../images/patchwork_poems/place-gibson.jpg";
import tree from "../images/patchwork_poems/tree.jpg";
import celestial from "../images/patchwork_poems/celestial.jpg";
import grapefruit from "../images/patchwork_poems/grapefruit.jpg"
import lightning from "../images/patchwork_poems/lightning.jpg";
import sea from "../images/patchwork_poems/sea.jpg";
import violets from "../images/patchwork_poems/violets.jpg";
import winds from "../images/patchwork_poems/winds.jpg";


const treeText = `You lay so still in the sunshine,/
you/
become a tree/

I have no heart only/
a body in space./
and you/
Make room for me/

I love you as the plant that never blooms/
And from the same simplified point of view/
I have to adore the earth`;

const celestialText = `you and I,/
    we have always been/
        celestial body/
sharing the same space/
at different times`;

const grapefruitText = `my partner and I spend most of our time/
whirled and tossed into delicious dancing/

It is marvellous to wake up together/
Sweetly/
ravenous/

when we part, at last,/
I pack them half a grapefruit and some sugar/
and a white chocolate chip muffin, to take away`;

const lightningText=`You scarcely breathed in your slumber,/
    So dreamless it was, so deep —/
It is the prickling air that wakes us up/

Here./
Give me your hand/
    we shall ride the lightning ere we die`;

const seaText=`O'er the hill and o'er the lea,/
    the swell of Summer's ocean/
        begs up the beach/
        
The land and the sea/
    have/
        done this for years, this exact same thing for years./
        
When the summer time is dying,/
    The waves lie still and gleaming,/
        the mirror of the earth./
        
Love is the place/
where they meet.`;

const violetsText=`the four white violets/
    possesive and faithful/
        blush when you pass.`;

const windsText=`I know why/
    the autumn's winds are sighing/
        like music on the waters/
The wind must have heard/
    your voice/
It echoes and sings like you.`;

const poems = [
    {src: violets, alt: violetsText},
    {src: sea, alt: seaText},
    {src: winds, alt: windsText},
    {src: tree, alt: treeText},
    {src: celestial, alt: celestialText},
    {src: lightning, alt: lightningText},
    {src: grapefruit, alt: grapefruitText},

]


function PatchworkPoemsPage() {

  return (
    <>
    <h2> Patchwork Poems </h2>

        <p>
        As part of a project in 2020, I compiled a list of 20 love poems, printed out two copies of each, {" "}
        and cut out every other line for each copy. The result was a series of half-poems that could only {" "}
        be read as a whole when put together.
        </p>

        <img src={place} alt={`Two pieces of paper held on top of each other, together forming the poem
            "Love is the place/ where the wounded/ started calling the wounds/ on their knees strawberries `}/>

        <p>
        After the project was over, I had a jar full of the remaining cut-out lines from all of the poems. {" "}
        It sat on my desk for a year, waiting to be recycled.
        </p>

        <img src={jar} alt=" A jar with cutout lines of poetry inside it."/>


        <p>
        At the end of 2021, I decided to take these lines and re-assemble some of them into new poems. {" "}
        Separated from their original settings, I found a new sense of meaning in their combination. {" "}
        </p>
        <p>
        Here are the results:
        </p>

        {poems.map(poemInfo => <><img src={poemInfo.src} alt={poemInfo.alt} key={poemInfo.alt}/><br/></>)}


        <p>
        Only 16 of the original 20 poems ended up being represented above. They are as follows:
        </p>

        <ul>
            <li>"Blush"	by Georgie Henley</li>
            <li>"Stanzas for Music" by Lord Byron</li>
            <li>"Place" by Andrea Gibson</li>
            <li>"Your Little Voice" by e e cummings</li>
            <li> "For Who?" by Mary Weston Fordham</li>
            <li>"Love Song"	by Henry Dumas</li>
            <li>"Song ("I almost went to bed ...")" by Leonard Cohen</li>
            <li>"Valentine" by Carol Ann Duffy</li>
            <li>"mercifully ordain that we may become aged together" by Ann Grey</li>
            <li>"My partner wants me to write them a poem about Sheryl Crow" by Kayleb Rae Candrilli </li>
            <li>"Xvii (I Do Not Love You...)" by Pablo Neruda</li>
            <li>"On the Hill-Side" by Radclyffe Hall</li>
            <li>"Dear —" by Donika Kelly</li>
            <li>"Intimate, Low-Voiced, Delicate Things"	by Elizabeth Bishop</li>
            <li>"Immortal Sails" by Alfred Noyes</li>
            <li>"A Conceit" by Maya Angelou</li>
        </ul>

       
    </>
  );
}

export default PatchworkPoemsPage;
