import { useState } from "react";

import useless_machine from "../../images/titles_interpreted/useless_machine.png"
import inventives from "../../images/titles_interpreted/Incentives.png"
import astronomy from "../../images/titles_interpreted/Astronomy.png"
import weaponization_of_words from "../../images/titles_interpreted/weaponization_of_words.png"
import charitable_lord from "../../images/titles_interpreted/charitable lord.png"
import literary_rebellion from "../../images/titles_interpreted/A Literary Rebellion.png"
import how_am_i_alive from "../../images/titles_interpreted/How am I Alive.png"
import into_thy_depths from "../../images/titles_interpreted/Into thy Depths.png"
import liminality from "../../images/titles_interpreted/liminality.png"
import love_letter from "../../images/titles_interpreted/Love Letter to John Doyle.png"
import monogamy_and_volition from "../../images/titles_interpreted/Monogamy and Volition.png"
import morality from "../../images/titles_interpreted/Morality.png"
import of_mice_and_men from "../../images/titles_interpreted/Of Mice and Men.png"
import op_ed from "../../images/titles_interpreted/Op-ed.png"
import picturing_dorian from "../../images/titles_interpreted/Picturing Dorian Gray.png"
import interference_in_construction from "../../images/titles_interpreted/Public Policy Interference in Construction.png"
import punc from "../../images/titles_interpreted/PUnC.png"
import tigertown from "../../images/titles_interpreted/Tigertown.png"
import uncommon_roles from "../../images/titles_interpreted/Uncommon Roles.png"
import virginity_lost from "../../images/titles_interpreted/Virginity Lost.png"
import omam_screenshot from "../../images/titles_interpreted/omam_screenshot.png"

import {ImageOverlay} from "../../components/commonComponents";

const titlesInfo = [

    {
      title: "Women's Authorship and Authority: A literary rebellion in the New Portuguese Letters",
      content: <>
        The first installment in the <i>New Portuguese Letters</i> quartet, A Literary Rebellion introduces us to the 
        land of Liternia, a place where words can literally change the world. A new form of linstuistic-reality
         manipulation technology developed in the city-state of New Portuguese has ushered it into an age of 
         prosperity and prestige. Only a few recognize the darker side &#8212; how the new hyper-reality of language is 
         strengthening the biases coded into its use. Among these few are the members of the secretive Speculative Guild 
         of Women Authors, who are determined to save the city-state before it is too late &#8212; whatever the cost. 
        </>,
        image: literary_rebellion
    },

    {
      title: "Incentives in Schedule Collection Mechanisms for Student Theatre",
      content: <>
        <p>Maria, Simon, and Kate formed the Incentives three years ago, and since then 
        have become Emmerson High School’s most elite group of private detectives. Okay, 
        maybe they're Emmerson’s <i>only</i> group of private detectives, but they swear they can get 
        to the bottom of any mystery they set their mind to. As long as it doesn’t involve frogs.</p>

        <p>Ellie, stage manager for the Emmerson Drama Club, is certain that someone is trying to
            sabotage their winter production of <i>Les Miserables</i>. The actors keep receiving false versions 
            of the rehearsal plans, and suspicious conflicts with the auditorium space keep 
            coming up every time the tech crew is scheduled to work on the set. Can the Incentives get to 
            the bottom of the mystery before it's too late?</p> </>,
      image: inventives
    },
    {
      title: "An Epitome of Astronomy",
      content: <>A historical sci-fi novel, set in an alternate history version of the fifteenth century. 
      We follow Ahmad, a young student and astronomer working at the Samarkand Observatory in 1432. When he
        discovers a mysterious force that seems to be tied to the power of the stars, his life &#8212; and his 
        world &#8212; will never be the same.</>,
      image: astronomy
    },

    {
      title: "Useless Machine",
      content: <>
        Nat works at a junkyard where robots that have outlived their serviceable time are brought 
        to be disassembled into parts. When she is sent to track down a dysfunctional runaway unit, an accident 
        finds the two of them trapped in a warehouse thousands of miles from Nat’s home. What follows is a 
        journey full of adventure, danger, and unlikely friendship.</>,
      image: useless_machine,
    },

    {
      title: "The Weaponization of Words ",
      content: <>
        In this 10th anniversary edition of <i>The Weaponization of Words</i>, we return once again 
        to the land of Liternia for the second novel in the <i>New Portugese Letters</i> quartet. The city-state 
        of New Portugese experiences unprecedented power due to its recent technical breakthrough in 
        linguistic-reality manipulation. Lizabeth is among the few who know that this power comes at a terrible cost. 
        She and her friends in the Speculative Guild of Women Authors have thus far managed to evade the grasp of 
        the sinister Philological Council, but they cannot hide forever. The Council is closing in, and war with 
        the neighboring city-state of Thycia looms on the horizon. The guild can no longer stay safe in the shadows. 
        They must take up their words and fight openly in order to defend the city that they love.</>,
      image: weaponization_of_words
    },

    {
      title: "PUnC",
      content: <>
        An independent documentary about the interaction and intersections between punk and hacker subcultures, 
        exploring the evolution of DIY ethics across genres and disciplines.
        </>,
      image: punc
    },

    {
      title: "Monogamy and Volition",
      content: <>
        Dr. Montgomery Monogamy has been busy. Ever since Cassandra left and she became the last link between worlds, 
        it’s been up to her to keep the lines open and investigate the mysterious disappearance of the Volition 
        Mechanism, all while maintaining a consistent teaching schedule and dealing with the cantankerous co-author 
        of her next paper. When she discovers a message hidden inside one of her student’s cryptic sleep-deprived 
        ramblings, she may have found the key — but things are more complicated than they seem. Can she crack the code 
        before the semester ends and the door is locked forever?
        </>,
        image: monogamy_and_volition
    },

    {
      title: "Love Letter to John Doyle",
      content: <>
       <p><i> "If I’m not going to send this, does it count as a letter? It helps, though, to know I’m writing 
         to someone. It makes me feel a little less alone”.</i></p>
        <p>Emma Abbot has never met renowned theatrical director John Doyle, and she certainly doesn’t expect him 
          to read her letters. She has seen him speak, though, eight years ago at a talk-back for his production of 
          <i> Oklahoma!</i>, and she’s been writing to him ever since. Following Emma through her letters, we see her 
          friendships, dreams, and heartbreaks in this intimate portrait of a young woman at the brink of discovering 
          her truth.</p>
        </>,
        image: love_letter
    },

    {
      title: `"How Am I Alive?" The Anxiety of Theatricality and Creating Consciousness in Toy Story 4`,
      content: <>
        A quirky web series that follows Kyle, a twenty-four year old who learns, when they visit their childhood 
        home, that they have the ability to bring toys to life. As time goes on, they find themselves wrestling 
        with the moral and philosophical implications of their power as they navigate their relationships with 
        the beings they have created and with the world around them.
        </>,
        image: how_am_i_alive
    },

    {
      title: "A Plea to Our Charitable Lord",
      content: <>
        When Sam met Helena at the South Charleston flea market, she knew there was something special
       about her. She <i>didn't</i> know, however, that her new crush was related to godly undead royalty. Dating 
       can be complicated even at the best of times. Throw in your new girlfriend being the daughter of the 
       Lord of the Dead, and things get outright chaotic. Now the Lord is doing everything in his power to break 
       them up from beyond the grave — can their newfound love stand up to the test?</>,
       image: charitable_lord
    },

    {
      title: "Tigertown Semiconductors Optoelectronics Report",
      content: <>
        Ever since the Shattering, the once booming settlement of Tigertown has become a hotbed for illicit 
        electronics trading. Erin, a maintenance clerk at the Tigertown Office of Trade, has always tried to keep his head 
        down and stay out of illegal business. When he finds a report that suggests the Office is developing a dangerous 
        technology that allows people to see and control the future, however, his world is thrown out of balance. 
        In this first installment of the riveting <i>Tigertown</i> saga, Erin will come face to face with forces he 
        never imagined as he becomes enmeshed in the electronic underworld.
        </>,
        image: tigertown
    },

    {
      title: "Of Mice and Men",
      content: <>
        A detailed epidemiological study of pathogens spread to humans through rodent carriers. Includes such 
        classic examples as lymphocytic choriomeningitis and the bubonic plague.
        </>,
        image: of_mice_and_men
    },

    {
      title: "Malewives and Morality",
      content: <>
        A couple invites a group of friends over for one last social dinner before their house is repossessed. 
        As the night drags on, attractions are revealed, tensions rise to the surface, and old assumptions come into 
        question. With wit and dark humor, Greta Gerlbaas’ award-winning play “Malewives and Morality” provides a 
        wry take on relationships, wine pairings, and the nature of truth. 
        </>,
        image: morality
    },

    {
      title: "Into Thy Depths",
      content: <>
        <p><i>The Open Energies, book 1</i></p>
        <p>Virginity Evans is bored. Every day in her life seems the same: school, piano, and lacrosse practice 
          blending together in endless tedium. When she stumbles into an internet 
          chat room full of people claiming to have extraordinary powers, however, Ginny’s world is changed forever. 
          Drawn deeper and deeper into a web of secrets and conspiracies, Ginny comes face to face with wonder 
          and danger she could never have imagined. Will she be able to break out before it is too late? </p>
        </>,
        image: into_thy_depths
    },
    {
      title: "Virginity Lost",
      content: <>
        <p><i>The Open Energies, book 4</i></p>
        <p>It’s been three years since Virginity Evans discovered the Entities, and she is deeper enmeshed in 
        their games than ever before. A terrible betrayal has left her stranded in another dimension with only 
        one page of the codex risked so much to steal. As she struggles to decipher its meaning and find a way out, 
        Ginny begins to wonder if she’ll ever make it back to the world she once knew &#8212; and, more importantly, 
        does she even want to?</p>
        </>,
        image: virginity_lost
    },

    {
      title: `Public Policy Interference in Construction: How Government Regulation of Sand Use in Concrete 
      Has the Potential to Improve the Environment in Two Significant Ways`,
      content: <>
        Our favorite protagonist, Public Policy, returns for another thrilling tale in <i>Interference in Construction</i>. 
        Years ago, the crossroads city of Two Significant Ways was devastated by the invasion of the Evil Horde. 
        Just as the the city's rebuilding is on track, a mysterious interference begins to get in the way. 
        It's up to Policy to brave the stacks of government regulations and figure out the mystery.
        </>,
        image: interference_in_construction
    },

    {
      title: "Picturing Dorian Gray: Gender, Sexuality, and Adaptation",
      content: <>
        A book of photographs taken as a part of an investigation into the effects of Hurricane Dorian on 
        Gray Kingbird populations along Elbow Cay (specifically in regards to changing social structures 
        and reproductive behavior).
        </>,
        image: picturing_dorian
    },

    {
      title: "Uncommon Roles and Others: A Five Act Queer Journey through Straight Theater",
      content: <>
        Dani isn’t an actor. She shows up, paints the sets, and goes on her merry way.  When the fake door 
        she's finished painting one one of the walls swings open, however, Dani finds herself in the mysterious 
        world of Straight Theater &#8212; where, as the clockwork kitten chimes, everything is 
        “theater straight and true, from the Top of the Show to the end of the Acts”. It is a place where 
        the lines between reality and illusion are blurred, where everybody has a part to play and nothing 
        is as it seems. Dani will need to have her wits about her &#8212; and maybe even act on 
        stage &#8212; if she is to make it through the Five Acts that lie between her and the way home. 
        </>,
        image: uncommon_roles
    },


    {
      title: "Op-Ed: Should Gender Dysphoria Be Included in the DSM-5",
      content: <>
        When Hailee and Kyle take over as lead editors for Randolph High School’s student newspaper, they have big 
        plans. No more limiting the paper to stories about school events: they’re going to tackle big issues 
        and publish pieces they believe will make a difference. But when an op-ed about gender sparks 
        controversy in the community, they learn that change is harder than they thought. With the school board 
        up in arms and Principal Richards threatening to shut the paper down, Kyle and Hailee find themselves 
        turning to unlikely allies in the fight to make their fellow students’ voices heard.
        </>,
        image: op_ed
    },

    {
      title: "The Limits of Liminality",
      content: <>
        Tara has a gift: she can shift between different liminal spaces at will. The problem is, she can’t 
        control it. One moment she’ll be standing in a train station at night, and the next thing she knows, 
        she’s in the sixth floor stack of her university’s library. When Tara starts finding mysterious notes 
        left in every place she shifts, she’s hopeful it might mean there is someone else out there like her, 
        and she sets out to find them. When space warps and bends around you, however, you never know where you’ll 
        end up, and Tara might just find more than she bargained for.
        </>,
        image: liminality
    },

    {
      title: "The Creation of the Rebellious Self",
      content: <>
      <p>It all started when Joelle was called into the Principal’s office at school for scribbling crayon 
        all over the math worksheets, which she swears she didn’t do (even if long division is the WORST). 
        Then at lunch, her best friend wouldn’t talk to her. The cause of all this trouble? It turns out she 
        has and evil twin. And that’s not the end of it &#8212; she’s from another dimension, and she needs 
        Joelle’s help to get back! Can Joelle get over her hatred of Noelle long enough to get her back where 
        she belongs?</p>
      
        </>,
    },

    {
      title: "My Favorite Meal",
      content: <>
        A rather gruesome short story about a boy who discovers the true secret to his mother’s award-winning meatloaf.
        </>,
    },

    {
      title: "Advisory Memo for Senator Smar T. Pants",
      content: <>
        Smar T. Pants, universe-renowned mind-powered superhero, has just been elected Senator of the 
        State Republic of the Milky Way, and she is full of ideas about how to make her corner of the universe a 
        better place. Little does she know, a plot is forming in the shadows of state bureaucracy, dastardly enough 
        to rival any supervillain threat she has ever faced. Will she be up to the challenge?
        </>,
    },

    {
      title: "One Student in Search of an Emotionally Sustainable Acting Technique",
      content: <>
        Ryan Locke, fed up with their high school drama program, decides they need to branch out 
        in their senior year and resolves to write, produce and perform in a show of their own. Enlisting the help 
        of their boyfriend Collins, they set off to write a script over the summer. Disaster strikes when Collins 
        breaks up with them six months into the year, leaving Ryan with a two-person play and no scene partner. 
        Can they get over Collins, find a new actor, and finish the play in time?
        </>,
    },

    {
      title: "A Deeper Look into the Three Reasons Why I Chose BSE: I Can't Read. I Can't Write. I Can't Act. I Can't Count.",
      content: <>
        An anthropological exploration into the culture surrounding engineering students at Princeton. How do common 
        experiences such as crying over psets manifest in a shared rhetoric? We all know the myth, but how often do 
        they <i>actually</i> shower?
        </>,
    },

    {
      title: "Standard Operating Procedure for the Theatre Intime Production Manager",
      content: <>
        People have been saying for years that someone should write a farce about Theatre Intime. Well, at long last, 
        here it is! We follow a week in the life of Sydney, Production Manager of Theatre Intime, as she navigates 
        tech disasters, board-member drama, season proposals and out-of-control directors. Will this year’s 
        co-production with PUP have no costumes? Will the set of the reunions show include both a stage full of 
        sand and confetti? Will the next season be composed entirely of Marvin Cheiten plays? Not if she can help it!
        </>,
    },

    {
      title: "Napoleon(s) in the New World: Defending the Personality View of Personal Identity.",
      content: <>
        A family-centric comedy film that follows Nannete Napoleon and her six children on a 
        road trip across the United States. 
        </>,
    },

    {
      title: "Babble and the Erotics of the Feminine Cybernetic Voice",
      content: <>
      <p>Babble is in their third year at the University of Psychic Phenomenology when they begin hearing 
        a mysterious voice. Determined to find the source, they track the signal down to the other side of the world.</p>
      <p>Callista’s voice has been cybernetically enhanced for five years, but this is the first time it’s had 
        side effects like this. She’s resolved to help Bab figure out what’s going on.</p>
      <p>The two set out to find the meaning behind their mysterious connection, but the path is more treacherous 
        they thought, and their growing feelings for each other make everything more complicated. Will Bab and 
        Callista make it through with the answers they seek?</p>
        </>,
    },

    {
      title: "Rake Castration: Sex, Money, and Restoration Comedy",
      content: <>
        In this raunchy workplace comedy, we follow Rake, a new addition to the backyard shed, as she tries to impress 
        the shovels and prove to all the garden tools that she, too, can be “fun”. When a wild prank puts Rake 
        face to face with someone from her past, however, she'll have to figure out just how far she's willing to go to fit in.
        </>,
    },

  

  ]


function TitleItem(props) {
    const {title, content, image, setOverlayImageInfo} = props;

    return (
  
    <div className="centered">
       <hr/>
        <h3 style={{fontSize: "1.5rem"}}> {title}</h3>
     
        {image && <>
          <img src={image} alt={title} style={{maxHeight: 380, cursor: "pointer"}} onClick={()=> setOverlayImageInfo({image, title})}/>
          <br/> <br/></>}
        <div style={{textAlign: "justify"}}>{content}</div>
    </div>


    )
}

function DeansDateTitlesPage() {

  const [overlayImageInfo, setOverlayImageInfo] = useState(null);

  const titlesContent = titlesInfo.map(titleInfo => 
    (<TitleItem key={titleInfo.title} setOverlayImageInfo={setOverlayImageInfo} {...titleInfo} />))
       

  return (
    <>
   {overlayImageInfo && <ImageOverlay closeOverlay={()=>setOverlayImageInfo(null)} 
                                      image={overlayImageInfo.image} alt={overlayImageInfo.title}/>}
    <h2> What's in a Name?</h2>
  
      <p><i>"Send us the title of your Dean's Date assignment with no further context, and we'll tell you what it's about."</i></p>

      <p>
        At my undergrad university, Dean's Date marked the end of the reading period that followed each semester. It was the 
        day when final papers and projects were due, after which exam period began. The day before Dean's Date
        was always particularly stressful, as those of us who had waited until the last minute pushed our limits to finish everything
        by the deadline. </p>
        
      <p>
        To help lighten the mood and provide some distraction from the stress, my 
        <a href="https://www.theatreintime.org" target="_blank" rel="noreferrer"> student theater group </a> would host an 
        email exchange for those final 24 hours where we shared content to keep each other entertained, 
        including pictures of pets, memes, online quizzes, and castings of theater board members 
        as everything from Harry Potter characters to Glee storylines to "things I found in my backpack".
       </p>

       <p>
         One of my main contributions to the chaos came through the "titles" thread, where students would send the title
         of the paper or project they were working on and someone else would make up a summary of its contents, 
         subject to wild and intentional misinterpretation. I wasn't the one to come up with this, or the only one to 
         contribute, but I loved the concept and jumped gleefully into the fray. As the semesters passed and I took over 
         as the one starting/running the thread, my descriptions became more elaborate, and eventually I started 
         throwing in graphics as well, cobbled together from whatever I could find marked as free-to-use on the 
         internet (and occasionally my own drawings). 
      </p>

        <figure>
        <img src={omam_screenshot} className="centered"
          alt="Screenshot of a Word document titled Of Mice and Men, with a clip-art graphic on the first page" />

          <figcaption> <i>A friend included one of my silly little graphics on the title page his actual paper!</i>
            </figcaption>

</figure>

      <p> Some of these contributions (mainly from my last couple semesters as an undergraduate), with graphics and without,
          are collected below:
      </p>

      {titlesContent}
  
    </>
  );
}

export default DeansDateTitlesPage;
