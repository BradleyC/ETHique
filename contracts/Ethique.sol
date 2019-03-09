pragma solidity >=0.4.24;

interface tokenRecipient { 
    function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external; 
}

contract Ethique {
    
    // storage 
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint256 dmStakeReserve;
    address[] registeredUsers;
    uint8 public decimals = 0;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    mapping (address => bool) registrationIndex;
    mapping (address => bool) owners;
    mapping (address => uint) dmStake;
    mapping (address => uint) dmDeposited;
    mapping (uint => uint) msgToStake;
    mapping (uint => address) msgToSender;

    // events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Burn(address indexed from, uint256 value);
    event newUser(address user);

    constructor(
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol
    ) public {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
        owners[msg.sender] = true;
        _transfer(msg.sender, address(this), 2000000000000);
    }

    function interact(address _sender, address _recipient, uint _value) public onlyRegisteredUser(_sender) {
        _transfer(_sender, _recipient, _value);
    }

    function setDmStake(uint _value) public onlyRegisteredUser(msg.sender) {
        dmStake[msg.sender] = _value;
    }

    function sendDm(address _recipient, uint _value, uint message_id) public {
        require(_value >= dmStake[_recipient], "must meet user required stake");
        _transfer(msg.sender, address(this), _value);
        dmDeposited[_recipient] = dmDeposited[_recipient] + _value;
        dmStakeReserve = dmStakeReserve + _value;
        msgToStake[message_id] = _value;
        msgToSender[message_id] = msg.sender;
    }

    function rejectDm(uint _message_id) public {
        uint stake = msgToStake[_message_id];
        dmDeposited[msg.sender] = dmDeposited[msg.sender] - stake;
        dmStakeReserve = dmStakeReserve - stake;
    }

    function acceptDm(uint _message_id) public {
        uint stake = msgToStake[_message_id];
        _transfer(address(this), msgToSender[_message_id], stake);
        dmDeposited[msg.sender] = dmDeposited[msg.sender] - stake;
        dmStakeReserve = dmStakeReserve - stake;
    }

    function registerUser(address payable _newUser) public returns (bool success) {
        require(!registrationIndex[_newUser], "only one registration");
        registeredUsers.push(_newUser);
        registrationIndex[_newUser] = true;
        _transfer(address(this), _newUser, 500);
        emit newUser(_newUser);
        return true;
    }

    function getRegisteredUsers() public onlyOwner(msg.sender) returns (address[] memory users) {
        return registeredUsers;
    }

    function issueToken(address _to, uint _value) public onlyOwner(msg.sender) {
        _transfer(address(this), _to, _value);
    }

    function addToOwner(address _new) public onlyOwner(msg.sender) {
        owners[_new] = true;
    }

    modifier onlyRegisteredUser(address _user) {
        require(registrationIndex[_user] = true, "please register to use this route");
        _;
    }

    modifier onlyOwner(address _user) {
        require(owners[_user] = true, "please register to use this route");
        _;
    }

    function _transfer(address _from, address _to, uint _value) internal {
        require(_to != address(0x0));
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public
        returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData)
        public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }

    // Pausable?
}