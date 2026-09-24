import { Row, Col, Card } from "react-bootstrap";

import { FaCheckToSlot } from "react-icons/fa6";
import { GiOnTarget, GiBookmarklet } from "react-icons/gi";

const cardItems = [
  {
    title: "Vision",
    icon: <GiOnTarget size={"48px"} color="#0071BC" />,
    discription:
      "Empowering holistic growth through life skills for lifelong well-being.",
  },
  {
    title: "Mission",
    icon: <GiBookmarklet size={"48px"} color="#0071BC" />,
    discription:
      "A nurturing school for balanced, inclusive, and compassionate growth.",
  },
  {
    title: "Core Values",
    icon: <FaCheckToSlot size={"40px"} color="#0071BC" />,
    discription:
      "Child-centric, passionate, and creative; we value integrity, empathy, collaboration, commitment, and self-awareness.",
  },
];

export default function SchoolCard() {
  return (
    <>
      <Row className="d-none d-md-flex justify-content-between">
        {cardItems.map((item, index) => (
          <Col className="p-2 d-flex" md={4} key={index}>
              <Card.Body className="d-flex align-items-center justify-content-center flex-column text-center">
                {item.icon}
                <Card.Title className="py-2" style={{color:"#000"}}>
                  {item.title}
                </Card.Title>
                <Card.Text className="cardText" style={{color:"#000"}}>
                  {item.discription}
                </Card.Text>
              </Card.Body>
          </Col>
        ))}
      </Row>
      <div className="d-md-none">
        {cardItems.map((item, index) => (
          <div
            key={index}
            className="p-3 text-center text-light mb-2"
            style={{ backgroundColor: "rgba(32, 32, 96, 0.9)" }}
          >
            <div className="carouselIcon">{item.icon}</div>
            <div className="carouseltitle py-2">
              <b>{item.title}</b>
            </div>
            <div className="carouselDescription">{item.discription}</div>
          </div>
        ))}
      </div>
    </>
  );
}
