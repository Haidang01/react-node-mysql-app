import "./stories.scss";

const Stories = () => {
  const currentImg= 'https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600'
  const stories = [
    {
      id: 1,
      name: 'John Smith',
      img:'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      id: 1,
      name: 'John Smith',
      img:'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      id: 1,
      name: 'John Smith',
      img:'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
  ]

  return (
    <div className="stories">
      <div className="story">
        <img src={currentImg} alt="" />
        <span></span>
        <button>+</button>
      </div>
      { stories.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
