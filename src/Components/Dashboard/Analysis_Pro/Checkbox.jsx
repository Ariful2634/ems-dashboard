import { useState, useEffect } from 'react';

const Checkbox = () => {
    const [parent1Checked, setParent1Checked] = useState(true);
    const [child1Checked, setChild1Checked] = useState(true);
    const [child2Checked, setChild2Checked] = useState(true);

    const [parent2Checked, setParent2Checked] = useState(true);
    const [child3Checked, setChild3Checked] = useState(true);
    const [child4Checked, setChild4Checked] = useState(true);



    // Reset all checkbox states to true upon component mount or refresh
    useEffect(() => {
        setParent1Checked(true);
        setChild1Checked(true);
        setChild2Checked(true);
        setParent2Checked(true);
        setChild3Checked(true);
        setChild4Checked(true);
    }, []);


    // for parent checkbox 1
    const handleParent1Change = () => {
        const newValue = !parent1Checked;
        setParent1Checked(newValue);
        setChild1Checked(newValue);
        setChild2Checked(newValue);
        localStorage.setItem('Parent Checkbox 1', JSON.stringify(newValue));
        localStorage.setItem('Child Checkbox 1', JSON.stringify(newValue));
        localStorage.setItem('Child Checkbox 2', JSON.stringify(newValue));
    };

    const handleChild1Change = () => {
        const newValue = !child1Checked;
        setChild1Checked(newValue);
        if (!newValue && !child2Checked && parent1Checked) {
            setParent1Checked(false);
            localStorage.setItem('Parent Checkbox 1', JSON.stringify(false));
        } else if (newValue && !parent1Checked) {
            setParent1Checked(true);
            localStorage.setItem('Parent Checkbox 1', JSON.stringify(true));
        }
        localStorage.setItem('Child Checkbox 1', JSON.stringify(newValue));
    };

    const handleChild2Change = () => {
        const newValue = !child2Checked;
        setChild2Checked(newValue);
        if (!newValue && !child1Checked && parent1Checked) {
            setParent1Checked(false);
            localStorage.setItem('Parent Checkbox 1', JSON.stringify(false));
        } else if (newValue && !parent1Checked) {
            setParent1Checked(true);
            localStorage.setItem('Parent Checkbox 1', JSON.stringify(true));
        }
        localStorage.setItem('Child Checkbox 2', JSON.stringify(newValue));
    };

    // for parent checkbox 2
    const handleParent2Change = () => {
        const newValue = !parent2Checked;
        setParent2Checked(newValue);
        setChild3Checked(newValue);
        setChild4Checked(newValue);
        localStorage.setItem('Parent Checkbox 2', JSON.stringify(newValue));
        localStorage.setItem('Child Checkbox 3', JSON.stringify(newValue));
        localStorage.setItem('Child Checkbox 4', JSON.stringify(newValue));
    };

    const handleChild3Change = () => {
        const newValue = !child3Checked;
        setChild3Checked(newValue);
        if (!newValue && !child4Checked && parent2Checked) {
            setParent2Checked(false);
            localStorage.setItem('Parent Checkbox 2', JSON.stringify(false));
        } else if (newValue && !parent2Checked) {
            setParent2Checked(true);
            localStorage.setItem('Parent Checkbox 2', JSON.stringify(true));
        }
        localStorage.setItem('Child Checkbox 3', JSON.stringify(newValue));
    };

    const handleChild4Change = () => {
        const newValue = !child4Checked;
        setChild4Checked(newValue);
        if (!newValue && !child3Checked && parent2Checked) {
            setParent2Checked(false);
            localStorage.setItem('Parent Checkbox 2', JSON.stringify(false));
        } else if (newValue && !parent2Checked) {
            setParent2Checked(true);
            localStorage.setItem('Parent Checkbox 2', JSON.stringify(true));
        }
        localStorage.setItem('Child Checkbox 4', JSON.stringify(newValue));
    };

    return (
        <div>
            <div className='flex justify-center mt-10'>
                {/* setting the aria-label uniquely so that user can select multiple button */}
                <div className="join ">
                    <input className="join-item btn w-[100px]" type="checkbox" aria-label="Power" />
                    <input className="join-item btn w-[100px]" type="checkbox" aria-label="Cost" />
                    <input className="join-item btn w-[100px]" type="checkbox" aria-label="Diesel(L)" />
                </div>
            </div>

            {/* for checkbox */}
            <div className='h-[200px] mt-20 space-y-3'>
                <div>
                    <div className="ml-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-indigo-600 h-5 w-5"
                                checked={parent1Checked}
                                onChange={handleParent1Change}
                            />
                            <span className="ml-2">Load</span>
                        </div>
                    </div>
                    {parent1Checked && (
                        <div className="ml-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-indigo-600 h-5 w-5 ml-2"
                                    checked={child1Checked}
                                    onChange={handleChild1Change}
                                />
                                <span className="ml-2">Critical Load</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-indigo-600 h-5 w-5 ml-2"
                                    checked={child2Checked}
                                    onChange={handleChild2Change}
                                />
                                <span className="ml-2">Cooling Load</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div className="ml-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-indigo-600 h-5 w-5"
                                checked={parent2Checked}
                                onChange={handleParent2Change}
                            />
                            <span className="ml-2">Source</span>
                        </div>
                    </div>
                    {parent2Checked && (
                        <div className="ml-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-indigo-600 h-5 w-5 ml-2"
                                    checked={child3Checked}
                                    onChange={handleChild3Change}
                                />
                                <span className="ml-2">DPDC</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-indigo-600 h-5 w-5 ml-2"
                                    checked={child4Checked}
                                    onChange={handleChild4Change}
                                />
                                <span className="ml-2">Generator</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkbox;
