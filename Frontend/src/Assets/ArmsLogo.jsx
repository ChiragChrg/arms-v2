const ArmsLogo = ({ fill = "var(--primary)", stroke = "var(--base)", size = "100" }) => {
    return (
        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" fill={fill} stroke={stroke} width={size} height={size} style={{ strokeWidth: "20" }}>
            <path id="Shape 3" d="m260 380l40 80 180 40 28.5 76.3-28.5 83.7-220 320h-160v-160l280-200 11.5-20-11.5-20-160-100v-120c2 0 40 20 40 20z" />
            <path id="Shape 3 copy" d="m860.5 360v120l-160 100-11.5 20 11.5 20 280 200v160h-160l-220-320-28.5-83.7 28.5-76.3 180-40 40-80c0 0 38-20 40-20z" />
            <path id="Shape 4" d="m300 380v-280l240 80 240-80v280l-240 80z" />
            <path id="Shape 2" d="m375.4 279.4c86.8 50.7 164.6 116.6 164.6 116.6 0 0 66.6-64.5 143.5-111.6 91.3-55.8 196.5-88.4 196.5-88.4 0 0 15.1 38.8 42.6 64.8 23.9 22.6 57.4 35.2 57.4 35.2l-440 180-440-180c0 0 47.5-16.4 75.1-50.3 16.9-20.9 24.9-49.7 24.9-49.7 0 0 91.9 34.5 175.4 83.4z" />
        </svg>
    )
}

export default ArmsLogo