import Menu from '../components/Menu';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Menu />
      <h1>About</h1>
      <p>Hello World!</p>
    </div>
  );
};

export default About;
