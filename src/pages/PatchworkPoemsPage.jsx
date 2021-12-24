import jar from "../images/patchwork_poems/jar.jpg";
import place from "../images/patchwork_poems/place-gibson.jpg";
import tree from "../images/patchwork_poems/tree.jpg";
import celestial from "../images/patchwork_poems/celestial.jpg";
import grapefruit from "../images/patchwork_poems/grapefruit.jpg"
import lightning from "../images/patchwork_poems/lightning.jpg";
import sea from "../images/patchwork_poems/sea.jpg";
import violets from "../images/patchwork_poems/violets.jpg";
import winds from "../images/patchwork_poems/winds.jpg";

import { OutsideLink } from "../components/commonComponents";


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
    {src: tree, alt: treeText},
    {src: winds, alt: windsText},
    {src: sea, alt: seaText},
    {src: lightning, alt: lightningText},
    {src: grapefruit, alt: grapefruitText},
    {src: celestial, alt: celestialText},

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
        16 of the original 20 poems ended up having lines included above. They are as follows:
        </p>

        <ul>
            
            <li>"Place" by <OutsideLink link="https://andreagibson.org/">Andrea Gibson</OutsideLink></li>

            <li><OutsideLink link="https://www.instagram.com/p/CEEaS3enbQY/">"Blush" </OutsideLink>	
                by <OutsideLink link="https://www.instagram.com/awkwardcrone/"> Georgie Henley </OutsideLink></li>

            <li><OutsideLink link="https://www.poetryfoundation.org/poetrymagazine/poems/147622/dear-">"Dear —" </OutsideLink>
                by <OutsideLink link="https://www.donikakelly.com/">Donika Kelly</OutsideLink></li>

            <li><OutsideLink link="https://www.poetryfoundation.org/poetrymagazine/poems/150057/my-partner-wants-me-to-write-them-a-poem-about-sheryl-crow">
                "My partner wants me to write them a poem about Sheryl Crow" </OutsideLink>
                by <OutsideLink link="https://www.krcandrilli.com/">Kayleb Rae Candrilli </OutsideLink></li>

            <li> <OutsideLink link="https://poets.org/poem/who-0">"For Who?"</OutsideLink> by <OutsideLink 
                link="https://en.wikipedia.org/wiki/Mary_Weston_Fordham"> Mary Weston Fordham </OutsideLink></li>

            <li><OutsideLink link="https://www.poetryfoundation.org/poems/53474/love-song-56d232c8ae8b8">
                Love Song" </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Henry_Dumas"> Henry Dumas </OutsideLink></li>
            
            <li><OutsideLink link="https://poets.org/poem/hill-side">"On the Hill-Side" </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Radclyffe_Hall">Radclyffe Hall</OutsideLink></li>
            <li> 
                <OutsideLink link="https://www.poetryfoundation.org/poems/43846/stanzas-for-music">
                "Stanzas for Music"</OutsideLink> 
                by <OutsideLink link="https://en.wikipedia.org/wiki/Lord_Byron"> Lord Byron </OutsideLink></li>

            <li><OutsideLink link="https://www.poetryfoundation.org/poems/47570/immortal-sails">"Immortal Sails" </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Alfred_Noyes">Alfred Noyes</OutsideLink></li>
            <li>
                <OutsideLink link="https://www.best-poems.net/e_e_cummings/your_little_voice.html"> 
                "Your Little Voice"</OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/E._E._Cummings">e e cummings</OutsideLink></li>

            <li><OutsideLink link="https://leonardcohenfiles.com/poem.html#song">"Song ("I almost went to bed ...")" 
                </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Leonard_Cohen"> Leonard Cohen </OutsideLink></li>

            <li><OutsideLink link="https://www.scottishpoetrylibrary.org.uk/poem/valentine/">"Valentine" </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Carol_Ann_Duffy">Carol Ann Duffy</OutsideLink></li>

            <li><OutsideLink link="https://anthonywilsonpoetry.com/2016/08/30/lifesaving-poems-ann-grays-mercifully-ordain-that-we-may-become-aged-together-2/">
                "mercifully ordain that we may become aged together" </OutsideLink> by <OutsideLink 
                link="https://www.forwardartsfoundation.org/forward-prizes-for-poetry-2/ann-gray/">Ann Grey</OutsideLink></li>

            <li><OutsideLink link="https://www.poetryfoundation.org/poems/49236/one-hundred-love-sonnets-xvii">
                "Xvii (I Do Not Love You...)" </OutsideLink>
                by <OutsideLink link="https://en.wikipedia.org/wiki/Pablo_Neruda">Pablo Neruda</OutsideLink> 
                (trans. Mark Eisner)</li>

            <li>"Intimate, Low-Voiced, Delicate Things"
                by <OutsideLink link="https://en.wikipedia.org/wiki/Elizabeth_Bishop">Elizabeth Bishop</OutsideLink></li>

            <li>"A Conceit" by <OutsideLink link="https://en.wikipedia.org/wiki/Maya_Angelou">Maya Angelou</OutsideLink></li>
        </ul>

       
    </>
  );
}

export default PatchworkPoemsPage;
