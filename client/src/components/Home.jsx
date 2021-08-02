import React, { useLayoutEffect, useRef, useState } from "react";
import { MaxWidthContainer, Col, Row, FlexBox } from "./styled";
import DeathChart from "./DeathChart";
import "scss/home.scss";
import data from "dummy.json";

const optimizeAnimation = (callback) => {
  let ticking = false;
  return (e) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback(e);
        ticking = false;
      });
    }
  };
};

const Home = () => {
  const [divWidth, setDivWidth] = useState({
    _50: 0,
    _100: 0,
  });
  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const debounce = useRef(false);

  useLayoutEffect(() => {
    setDivWidth({
      _50: divRef1.current.clientWidth < 760 ? divRef2.current.clientWidth : divRef2.current.clientWidth - 40,
      _100: divRef1.current.clientWidth,
    });
    const handleResize = () => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = setTimeout(() => {
        setDivWidth({
          _50: divRef1.current.clientWidth < 760 ? divRef2.current.clientWidth : divRef2.current.clientWidth - 40,
          _100: divRef1.current.clientWidth,
        });
      }, 100);
    };

    const clearEv = optimizeAnimation(handleResize);
    window.addEventListener("resize", clearEv);

    return () => {
      // cleanup
      window.removeEventListener("resize", clearEv);
    };
  }, []);

  return (
    <section id="Home">
      <Row>
        <Col>
          <MaxWidthContainer>
            <div className="charts--container">
              <FlexBox>
                <div className="flex--item" ref={divRef1}>
                  <div className="flex--item-w50" ref={divRef2}>
                    <DeathChart divWidth={divWidth._50} items={data} />
                  </div>
                  <div className="flex--item-w50">
                    <DeathChart divWidth={divWidth._50} items={data} />
                  </div>
                </div>
                <div className="flex--item">
                  <DeathChart divWidth={divWidth._100} items={data} />
                </div>
              </FlexBox>
            </div>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Home;
