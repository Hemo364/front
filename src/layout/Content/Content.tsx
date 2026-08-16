type ContentType ={
    className :string
}
const Content = ({className}:ContentType) => {
    return (
        <div className={className}>
            content
        </div>
    );
};

export default Content;