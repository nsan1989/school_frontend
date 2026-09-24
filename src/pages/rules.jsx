import { Container } from "react-bootstrap";
import Title from "../hooks/Title";

export default function RulesPage() {
  Title("Rules & Regulations");
  return (
    <>
      <div className="rulesHeader mb-3">
        <div className="rulesTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">
            Rules & Regulations
          </h1>
        </div>
      </div>
      <Container className="mb-3">
        <div className="rulesContent">
          <h3 className="fw-bold" style={{color: "#004D00"}}>Rules & Regulations:</h3>
          <ul style={{color: "#004D00"}}>
            <li>
              Special attention is given to ensure high standard of honesty and
              discipline among the students.
            </li>
            <li>
              Students are to strictly observe the school dress code. Wearing of
              make ups, fancy Jewelries, unruly long hair, long nails, tight
              pointed pants, tattoos on the body are not allowed.
            </li>
            <li>
              Punctuality is important in all aspects. Absentees should bring
              their absence record signed by their parents or guardians, whose
              details are provided at the time of admission, the next day and it
              should be shown to the Principal through the class teacher.
            </li>
            <li>
              Due courtesy is to be shown to all staffs, both teaching and
              non-teaching.
            </li>
            <li>
              All students must attend whole school hours once they are present
              for a day. They may be allowed to leave in between School hours
              for valid reasons with permission of the Principal.
            </li>
            <li>
              Parents withdrawing their wards mid-session (after admission) must
              clear tuition fees for the whole session.
            </li>
            <li>
              The class teacher or mentor will see to it that the books and
              other permitted articles are not lost in the school but they will
              not be responsible for the loss.
            </li>
            <li>
              Bringing of any electronic devices such as mobile phones/i-pads
              and expensive personal items are strictly prohibited. Once
              confiscated, they will be returned only at the end of the session
            </li>
            <li>
              Every student must possess a copy of school diary which should be
              brought to school daily.
            </li>
            <li>
              Any damage done to the school property will be made good by the
              parents of the student concerned.
            </li>
            <li>
              Any form of activities/functions in the name of the school shall
              be done with prior permission of the school authority.
            </li>
            <li>
              Under no circumstances will any student be allowed to attend
              school by self-driven vehicles/motorbikes.
            </li>
            <li>
              Students should not indulge in any sort of violence in the school
              campus – either verbal or physical.
            </li>
            <li>Students must not attend school when they are unwell.</li>
          </ul>
        </div>
        <div>
          <p className="text-danger">
            Note: Any matter pertaining to breach of School Rules and
            Regulations by the students will be taken up by the Discipline
            Committee. It will then be forwarded to the Principal who will
            initiate corrective measures for the students.
          </p>
        </div>
        <div className="rulesContent">
          <h3 className="fw-bold" style={{color: "#004D00"}}>Hostel Rooms Rules & Regulation :</h3>
          <ul style={{color: "#004D00"}}>
            <li>
              Each boarder must maintain utmost cleanliness and make sure the
              floor under his/her bed and cupboard is clean. Waste paper and
              rubbish must be thrown in the dustbins provided in the rooms and
              not littered on the floor.
            </li>
            <li>
              Keeping eatables in the dorms is unhygienic and stands prohibited.
            </li>
            <li>
              Hostellers may bring their own musical instruments, sports kits
              and art material.
            </li>
            <li>
              Please note that computer games, mobile phones, CD players with
              external speakers or gold jewellery etc are not permitted.
            </li>
            <li>
              Hostellers who are members of school photography club may bring
              their cameras, but these must be handed over to the respective
              wardens for safe keeping. They will be allowed to take and use
              them whenever necessary.
            </li>
            <li>
              Hostellers who wish to play tennis and squash must bring their own
              racquets and balls. Similarly, if any hosteller wishes to play
              badminton or table tennis, it would be preferable if they have
              their own badminton racquets/table tennis bat and balls.
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
